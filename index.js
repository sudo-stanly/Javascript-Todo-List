
const fab_btn = document.getElementById("fab-btn");
const form_window = document.getElementById("form-window");
const overlay = document.getElementById("overlay-effect");

const form = document.getElementById("form");
const mode = null;

let data={
    title:"",
    description:"",
    date:""
}


function openFormWindow(x){
    switch(x){
        case 'create':
            console.info("Creating todo");
            overlay.classList.toggle("toggle-overlay");
            form_window.classList.toggle("toggle-window");
            fab_btn.disabled=true;

            create.innerHTML="";
            create.innerHTML+=`
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
    create.innerHTML="";
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    try{
        console.log("Validating Form");
        
        const inputs = document.querySelectorAll("input");
        inputs.foreach((input)=>{
            console.log(input.value);
        });


        return true;
    }
    catch{
        console.clear();
        console.warn("Invalid Form");
        return false;
    }
    // finally{
    //     console.info("Todo list created!");

    //     overlay.classList.remove("toggle-overlay");
    //     form_window.classList.remove("toggle-window");
    //     fab_btn.disabled=false;
    //     create.innerHTML="";

    //     return true;
    // }
});