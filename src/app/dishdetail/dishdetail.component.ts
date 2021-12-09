import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dishes';
import { DishservicesService } from '../services/dishservices.service';
import { switchMap } from 'rxjs/operators';
import { DishComments } from '../shared/dishcomments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.less'],
  animations: [
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
 
  @ViewChild('cform') commentformDirective;
 
  dish!: Dish;
  dishIds!: string[];
  commentForm!: FormGroup;
  comment!: DishComments;
  prev?:string;
  next?:string;
  dishcopy!:Dish;
  errmess?:string;
  visibility = 'show';


  constructor(private dishservices:DishservicesService,
    private route:ActivatedRoute,
    private location:Location,
    private fb: FormBuilder,
    @Inject ('BaseURL') public BaseURL) { 

      this.createForm();
    }

    ngOnInit() {
      this.dishservices.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservices.getDish(params['id']);}))
      .subscribe(dish => { this.dish = dish;this.dishcopy=dish; this.setPrevNext(dish.id!);this.visibility='shown'; },
      errmess=>this.errmess=<any>errmess);
    }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishid: string) {
    const index = this.dishIds.indexOf(dishid);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: '',
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Please enter Author Name.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    }
  };

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment['date'] = Date();
   //this.dish?.comments?.push(this.commentForm.value);
   this.dishcopy?.comments?.push(this.comment);
   this.dishservices.putDish(this.dishcopy)
   .subscribe(dish => {
     this.dish = dish; this.dishcopy = dish;
   },
   errmess => {
    this.dish = null!; this.dishcopy = null!; this.errmess = <any>errmess;
   });
    this.commentForm.reset({
      author: '',
      rating: '',
      message: ''
    });

    this.commentformDirective.resetForm();
    
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }





}
