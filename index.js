
const fab_btn = document.getElementById("fab-btn");
const form_window = document.getElementById("form-window");
const overlay = document.getElementById("overlay-effect");

const form = document.getElementById("form");
let mode = null;
let isFieldEmpty = false;

let data={
    title:"",
    description:"",
    date:""
}

const pop_up = document.getElementById("pop-up-container-id");
let pop_up_content = document.getElementById("pop-up-box-id");
let alertType = null;


function openFormWindow(x){
    switch(x){
        case 'create':
            console.info("Creating todo");
            overlay.classList.toggle("toggle-overlay");
            form_window.classList.toggle("toggle-window");
            fab_btn.disabled=true;

            mode="create";

            form.innerHTML="";
            form.innerHTML+=`
                <div class="row">
                    <p><span>Create Todo</span></p>
                    <hr>
                </div>
                <div class="row">
                    <div class="input-container">
                        <p><span>Title</span></p>
                        <input type="text" name="title" placeholder="Enter your title here"/>
                    </div>
                    <div class="input-container">
                        <p><span>Description</span></p>
                        <input type="text" name="description" placeholder="Enter your description here"/>
                    </div>
                    <div class="input-container">
                        <p><span>Date</span></p>
                        <input type="date" name="date" />
                    </div>
                </div>
                <div class="row create-form-button">
                    <button type="button" onclick="cancel_creating()">Cancel</button>
                    <button type="submit">Create</button>
                </div>
            `;

            break;

        default:
            console.warn("Unknown parameter.");
            break;
    }
    return;
}

function cancel_creating(){
    overlay.classList.remove("toggle-overlay");
    form_window.classList.remove("toggle-window");
    fab_btn.disabled=false;
    form.innerHTML="";
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    switch(mode){
        case 'create':
            try{
                console.clear();
                console.info("Todo created.");

                let inputs = document.querySelectorAll("input");
                inputs.forEach((input)=>{
                    console.info(input);

                    if(input.value.trim() === ""){
                        console.error("Fields are empty.");
                        isFieldEmpty=true;
                    }
                });
                if(isFieldEmpty===true){
                    alertType="empty_field";
                    pop_up_alert();
                }
                else{
                    console.log();
                }

                return true;
            }
            catch{
                console.clear();
                console.warn("Invalid form.");
                return false;
            }           
        default:
            console.error("Invalid parameter.");
            break;
    }
    return;
});
function pop_up_alert(){
    console.warn("Form is Invalid");

    pop_up_content.innerHTML="";
    switch(alertType){
        case "empty_field":
            pop_up.classList.toggle("toggle-pop-up");
            pop_up_content.innerHTML+=`
                <div>
                    <p><span> ⚠ Please fill all required fields. </span></p>
                </div>
            `;
            setTimeout(()=>{
                console.info("pop-up hidden");
                pop_up.classList.remove("toggle-pop-up");
                pop_up_content.innerHTML="";
            },3000);
            break;
        default:
            console.error("Invalid Parameter.");
            break;
    }

}