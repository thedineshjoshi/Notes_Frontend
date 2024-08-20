import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Register } from "../Model/register.module";
import { Observable } from "rxjs";
import { AddNote } from "../Model/AddNote.module";
import { NoteUpdateViewModel } from "../Model/NoteUpdateViewModel.module";


@Injectable({
    providedIn:'root'
})
export class ApiCallService{
    constructor(private http:HttpClient){}
    registerUser(register:Register):Observable<any>{
        return this.http.post("https://localhost:7275/api/UserRegistration/Register",register,{responseType:'json'})
    }
    addNote(addNote:AddNote):Observable<any>{
        return this.http.post("https://localhost:7275/api/Notes/AddNote",addNote,{responseType:'json'})
    }
    getNote():Observable<any>
    {
        return this.http.get("https://localhost:7275/api/Notes/GetNotes",{responseType:'json'})
    }
    updateNote(id: string, note: NoteUpdateViewModel): Observable<any> {
        return this.http.put("https://localhost:7275/api/Notes/"+id,note,{responseType:'json'});
      }
    
      deleteNote(id: string): Observable<any> {
        return this.http.delete("https://localhost:7275/api/Notes/"+id,{responseType:'json'});
      }

      searchNotes(label: string): Observable<any> {
        return this.http.get<any>("https://localhost:7275/api/Notes/SearchNotes?label="+label,{ responseType: 'json' });
      }
}