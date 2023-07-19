import { Component, OnInit } from '@angular/core';
import { CardsService } from './Service/cards.service';
import { Card } from './models/card.model';
import { CorsOptions } from 'cors';
import { response } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }

  constructor(private cardService: CardsService){

  }
  
  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardService.getAllCards()
      .subscribe(
        response => {
          this.cards = response; // Ajuste de acordo com a estrutura da resposta
          
        }
      );
  }

  onSubmit() {

    if (this.card.id === '') {
      this.cardService.addCard(this.card)
      .subscribe(
        response => {
          this.getAllCards();
          this.card = {
            id: '',
            cardNumber: '',
            cardholderName: '',
            expiryMonth: '',
            expiryYear: '',
            cvc: ''
          }
        }
      );
    } else {
      this.updateCard(this.card);
    }

    
  }

  deleteCard(id: string){
    this.cardService.deleteCard(id)
    .subscribe(
      response => {
        this.getAllCards();
      }
    )
  }

  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card) {
    this.cardService.updateCard(card)
    .subscribe(
      response => {
        this.getAllCards();
      }
    )
  }
}
