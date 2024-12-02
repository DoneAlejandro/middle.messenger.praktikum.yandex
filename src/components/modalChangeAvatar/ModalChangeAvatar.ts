import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { uploadAvatar } from "../../services/user";
import { Input } from "../input";

export class ModalAvatar extends Block {
	initPublic() {
		const onChangeBind = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		document.addEventListener("click", this.handleClick);

		const UploadFile = new Input({
			name: "avatar",
			inputType: "file",
			label: "Choose a file on your computer",
			className: "modal-overlay__input",
			onChange: onChangeBind,
		});

		this.children = {
			...this.children,
			UploadFile,
		};
	}

	handleClick(e: MouseEvent) {
		const target = e.target as HTMLElement;

		if (target.id === "uploadButton") this.onSubmit(e);
	}

	onChange(e: Event) {
		const fileInput = e.target as HTMLInputElement;
		const submitBtn = document.querySelector("#uploadButton");
		const errorPlaceholder = document.querySelector("#avatarError");
		if (errorPlaceholder) errorPlaceholder.textContent = "";

		// validation
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0];
			const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

			if (!validTypes.includes(file.type)) {
				if (errorPlaceholder)
					errorPlaceholder.textContent = "Invalid file type. Please upload an image in JPG, PNG, or GIF format";
				return;
			}

			const maxSizeMB = 5;
			if (file.size > maxSizeMB * 1024 * 1024) {
				if (errorPlaceholder) errorPlaceholder.textContent = "File size exceeds the 5MB limit";
				return;
			}

			submitBtn?.removeAttribute("disabled");
		}
	}

	onSubmit(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		const form = document.querySelector("form") as HTMLFormElement;
		const fileInput = form?.querySelector('input[name="avatar"]') as any;

		const formData = new FormData(form);
		formData.append("avatar", fileInput);

		uploadAvatar(formData);
	}

	renderPublic() {
		return `
        <div class="modal-overlay" id="changeAvatarModal">
            <div id="change-avatar" class="modal-overlay__modal">
                <form class="modal-overlay__form">
                    <h4 class="modal-overlay__title">Upload photo</h4>
                    <div>
                        {{{ UploadFile }}}
                        <small id="avatarError" class="modal-overlay__error"></small>
                    </div>
                    <button type="button" id="uploadButton" class="modal-overlay__button">Upload</button>
                </form>
            </div>
        </div>
        `;
	}
}

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(ModalAvatar);
