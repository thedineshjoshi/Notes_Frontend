import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../Model/Note.Module';

@Pipe({
  name: 'filterByLabel',
  standalone:true
})
export class FilterByLabelPipe implements PipeTransform {
  transform(notes: Note[], searchLabel: string): Note[] {
    if (!searchLabel.trim()) {
      return notes;
    }
    const lowerCaseSearchLabel = searchLabel.toLowerCase();
    return notes.filter(note => note.label.toLowerCase().includes(lowerCaseSearchLabel));
  }
}
