import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  fetch_faqs: any = [];
  constructor() { }

  ngOnInit(): void {
    this.fetch_faqs = [...this.faqs];
  }

  faqs = [
      {
        id: 1,
        question: 'How do I get membership?',
        answer:'It’s easy! To become a member fill in our quick and easy to fill form. Once submitted, GharPar team will send you your membership ID through WhatsApp! Once you are a member, you are eligible for a 15% discount on all services except deals!',
        faq_category_id: 1,
        is_collapse: true,
      },
      {
        id: 1,
        question: 'How do I book a service?',
        answer:'Request for a membership and fill in our quick form to register. Once you receive your membership ID, follow the booking steps to make your first appointment.Appointment have to be made three hours in advance! Once your request is submitted, it will be processed and placed with the GharPar booking system as pending. GharPar team will send you a confirmation through WhatsApp along with the name of your beautician and your appointment details. All you need to do is sit back, relax and wait for your beauty therapist to arrive!',
        faq_category_id: 1,
        is_collapse: true,
      },
      {
        id: 1,
        question: 'What are the hours of operation?',
        answer:'Our hours of operation are 9AM to 9PM and are open from Monday – Sunday.',
        faq_category_id: 2,
        is_collapse: true,
      }
  ];

  faq_categories = [
    {
      id: 1,
      category_name: 'General',
      is_activated: true,
    },
    {
      id: 2,
      category_name: 'Appointment Changes',
      is_activated: false,
    },
    {
      id: 3,
      category_name: 'Cancellation & Refund',
      is_activated: false,
    },
    {
      id: 4,
      category_name: 'Complaints',
      is_activated: false,
    },
    {
      id: 5,
      category_name: 'Group Appointments & Corporate Packages',
      is_activated: false,
    },
    {
      id: 6,
      category_name: 'Running Late',
      is_activated: false,
    },
    {
      id: 7,
      category_name: 'Services',
      is_activated: false,
    },
    {
      id: 8,
      category_name: 'Social Media',
      is_activated: false,
    },
    {
      id: 9,
      category_name: 'Special Offers & Monthly Packages',
      is_activated: false,
    }
  ];

  handleClick(faq: any){
    this.fetch_faqs.filter((_faq: any) => _faq !== faq).map((faq: any) => faq.is_collapse = true);
    faq.is_collapse = !faq.is_collapse;
  }

  getCategoryFaqs(faq_category: any){
    this.faq_categories.filter(_faq => _faq !== faq_category).map(faq => faq.is_activated = false);
    this.fetch_faqs = this.faqs.filter((_faq:any) => _faq.faq_category_id == faq_category.id);
     faq_category.is_activated = true;
  }
}
