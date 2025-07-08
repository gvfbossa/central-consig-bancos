import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() route!: string;
  @Input() buttonText: string = 'Acessar';
}
