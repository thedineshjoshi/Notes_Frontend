import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

export class Register{
    public FirstName:string="";
    public LastName :string="";
    public UserName:string="";
    public Email:string="";
    public PasswordHash:string="";
    public userRegistrationForm:FormGroup;

    constructor()
    {
        let formBuilder = new FormBuilder();
        this.userRegistrationForm = formBuilder.group({
            FirstName:new FormControl(''),
            LastName:new FormControl(''),
            UserName:new FormControl(''),
            Email:new FormControl(''),
            PasswordHash:new FormControl('')
        })
    }
}