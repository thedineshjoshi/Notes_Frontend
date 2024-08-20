import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../../../Service/api-call.service';
import { AddNote } from '../../../../Model/AddNote.module';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  //userId: string = '';
  newNote: AddNote = {
    Title: '',
    Content: '',
    Label: '',
    BgColor: '#000',
    FontColor: '#fff',
    CreatedOn: new Date(),
    UpdatedOn: new Date(),
    UserId:''
  };
  
  constructor(   private router: Router, private authService: AuthService, private addNote: ApiCallService) {}
  ngOnInit(): void {
    this.newNote.UserId = this.authService.decodeToken().UserId;
  }
  createNote(): void {
    const now = new Date();
    const note: AddNote = {
      ...this.newNote,
      CreatedOn: now,
      UpdatedOn: now
    };

    this.addNote.addNote(note).subscribe({
      next: (response: Response) => {
        this.router.navigateByUrl('/dashboard');
        alert("Note Added Successfully");
      },
      error: (error: any) => {
        console.error('Error creating note:', error);
      }
    });

    this.newNote = {
      Title: '',
      Content: '',
      Label: '',
      BgColor: '#fff',
      FontColor: '#000',
      CreatedOn: new Date(),
      UpdatedOn: new Date(),
      UserId: this.authService.decodeToken().UserId
    };
  }

  navigateToDashboard(){
    this.router.navigateByUrl('/dashboard');
    }
}
