import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {ContactdetailsService } from '../services/contactdetails.service';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
  animations: [
    visibility(),
    expand()
  ]
})




export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;

  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  errmess?: string;
  feedbackcopy?:string;
  visibility = 'show';
  visibility_form = 'show';
  visibility_loader ='hidden';

   constructor(private fb: FormBuilder,
    private contactdetails: ContactdetailsService,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
   
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.visibility = 'hidden';
    this.visibility_loader = 'shown'
    this.contactdetails.putfeedback(this.feedback)
    .subscribe(feedback => {
      this.feedback = feedback;
      this.visibility_loader = 'hide';
    },
    errmess => {
      this.feedback=null!;this.errmess=<any>errmess;
    });
    setTimeout(() => {
      
      this.visibility='shown';
      this.visibility_form = 'hide'
      this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      });
      this.feedbackFormDirective.resetForm();
    }, 5000);
    
    
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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