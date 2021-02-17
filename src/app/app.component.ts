import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from './Item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public items: Item[]
  public editItem: Item
  public deleteItem: Item

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  public getItems(): void {
    this.itemService.getItems().subscribe(
      (response: Item[]) => {
        this.items = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddItem(addForm: NgForm): void {
    document.getElementById('add-Item-form').click()
    this.itemService.addItem(addForm.value).subscribe(
      (response: Item) => {
        console.log(response)
        this.getItems()
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onUpdateItem(item: Item): void {
    this.itemService.updateItem(item).subscribe(
      (response: Item) => {
        console.log(response)
        this.getItems()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onDeleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(
      (response: Item) => {
        console.log(response)
        this.getItems()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onOpenModal(item: Item, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button')
    button.type = 'button'
    button.style.display = 'none'
    button.setAttribute('data-toggle', 'modal')
    if (mode === 'add') {
      button.setAttribute('data-target', '#addItemModal')
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateItemModal')
      this.editItem = item
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteItemModal')
      this.deleteItem = item
    }
    container.appendChild(button)
    button.click()
  }

}
