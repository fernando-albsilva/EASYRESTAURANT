import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErMessages {

  // General context:
  public oneItemMustBeSelected: string = " Para editar é preciso selecionar pelo menos 1 item. " ;

  public onlyOneItemMustBeSelectedToEdit: string = " Somente é permitido editar 1 item de cada vez. ";


  // Home context:
  public canNotChangeTotalTableIfHasAnySelectedOrActive: string = " Não é permitido mudar o total de mesa, quando há mesas selecionadas ou ativas. ";

  public haveToFillWaiterAndClientName: string = " Só é permitido iniciar com cliente e garçom preenchidos.";

  public quantityOfProductCanNotBeZero: string = " Quantidade de produto não pode ser zero.";

  public thisTableAlredyIsStarted: string = " Essa mesa já foi iniciada.";

}
