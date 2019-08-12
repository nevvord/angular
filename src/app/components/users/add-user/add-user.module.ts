import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddUserComponent } from './add-user.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    declarations: [
        AddUserComponent
    ],
    imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class AddUser {}