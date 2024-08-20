import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByLabelPipe } from '../../Pipe/filter-by-label.pipe'
import { AuthService } from '../../Service/auth.service';
import { AddNoteComponent } from './AddNote/add-note/add-note.component';
import { Router } from '@angular/router';
import { ApiCallService } from '../../Service/api-call.service';
import { Note } from '../../Model/Note.Module';
import { NoteUpdateViewModel } from '../../Model/NoteUpdateViewModel.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FilterByLabelPipe,
    AddNoteComponent
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username:string="";
  searchLabel: string = '';
  notes: Note[] = [];
  searchQuery = '';
 
  constructor(
    private authservice:AuthService,private router:Router,private apicallservice:ApiCallService
  ){}

  ngOnInit(): void {
    this.username=this.authservice.decodeToken().UserName;
    this.loadNotes();
  }

  loadNotes() {
    this.apicallservice.getNote().subscribe(
      (data: Note[]) => {
        this.notes = data;
        this.notes.forEach(note => note.editMode = false);
      },
      error => {
        console.error('Error fetching notes', error);
      }
    );
  }

  editNote(note: Note): void {
    note.editMode = true;
  }

  cancelEdit(note: Note): void {
    note.editMode = false;
    this.loadNotes();
  }

  updateNote(id: string, updatedNote: NoteUpdateViewModel): void {
    this.apicallservice.updateNote(id, updatedNote).subscribe(
      (note: Note) => {
        const index = this.notes.findIndex(n => n.id === id);
        if (index !== -1) {
          this.notes[index] = note;
        }
      },
      error => {
        console.error('Error updating note', error);
      }
    );
  }

  deleteNote(id: string): void {
    this.apicallservice.deleteNote(id).subscribe(
      () => {
        this.notes = this.notes.filter(note => note.id !== id);
      },
      error => {
        console.error('Error deleting note', error);
      }
    );
  }


  searchNotes() {
    if (this.searchLabel.trim() === '') {
      this.loadNotes();
      return;
    }

    this.apicallservice.searchNotes(this.searchLabel).subscribe(
      (result: Note[]) => {
        this.notes = result;
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }


  navigateToAddNote()
  {
    this.router.navigateByUrl('/addnote');
  }
  logout()
  {
    this.authservice.logout();
  }
}
