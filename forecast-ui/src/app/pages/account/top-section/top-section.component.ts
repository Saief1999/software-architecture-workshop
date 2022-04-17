import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "app/models/user.model";
import { AccountService } from "app/services/account.service";

@Component({
  selector: "app-top-section",
  templateUrl: "./top-section.component.html",
  styleUrls: ["./top-section.component.css"]
})
export class TopSectionComponent implements OnChanges, DoCheck {
  imageUploadForm = new FormGroup({
    image: new FormControl("")
  });

  imagePath = "/assets/img/profile-avatar.png";

  constructor(private readonly accountService: AccountService) {}
  @Input() user: User = new User();
  @Output() imageUpdateEvent: EventEmitter<User> = new EventEmitter();
  ngOnChanges(): void {
    if (this.user.profileImage) {
      this.imagePath = this.user.profileImage;
    }
  }
  ngDoCheck(): void {
    if (this.user.profileImage) {
      this.imagePath = this.user.profileImage;
    }
  }

  submitProfileImage(event) {
    const image: File = event.target.files[0];
    if (image) {
      const formData: FormData = new FormData();
      formData.append("newImage", image);
      this.accountService.updateProrileImage(formData).subscribe({
        next: (data) => {
          const { user } = data;
          this.imageUpdateEvent.emit(user);
        }
      });
    }
  }
}
