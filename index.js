
const fab_btn = document.getElementById("fab-btn");
const form_window = document.getElementById("form-window");
const overlay = document.getElementById("overlay-effect");

const form = document.getElementById("form");
let mode = null;
let isFieldEmpty = false;

let data=[];

const pop_up = document.getElementById("pop-up-container-id");
let pop_up_content = document.getElementById("pop-up-box-id");

let list_container = document.querySelector(".list-container");

let updateIndex = null;

function openFormWindow(x, index){
    switch(x){
        case "create":
            console.info("Creating todo");
            overlay.classList.toggle("toggle-overlay");
            form_window.classList.toggle("toggle-window");
            fab_btn.disabled=true;

            mode="create";

            form.innerHTML="";
            form.innerHTML+=`
                <div class="row" title="Close">
                    <div>
                        <button type="button" onclick="closeFormWindow()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#22181C" fill-rule="evenodd" d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg>
                        </button>
                        <p><span>Create Todo</span></p>
                    </div>
                    <hr>
                    <br>
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
                    <button type="button" onclick="cancelCreating()">Cancel</button>
                    <button type="submit">Create Todo</button>
                </div>
            `;

            break;

        case "view":
            console.info("Viewing todo");
            overlay.classList.toggle("toggle-overlay");
            form_window.classList.toggle("toggle-window");
            fab_btn.disabled=true;

            mode="view";

            form.innerHTML="";
            form.innerHTML+=`
                <div class="row">
                    <div>
                        <button type="button" onclick="closeFormWindow()" title="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#22181C" fill-rule="evenodd" d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg>
                        </button>
                        <p><span>Viewing Todo</span></p>
                    </div>
                    <hr>
                    <br>
                </div>
                <div class="row">
                    <div class="input-container">
                        <p><span>Title</span></p>
                        <input disabled type="text" name="title" value="${data[index].TITLE}"/>
                    </div>
                    <div class="input-container">
                        <p><span>Description</span></p>
                        <input disabled type="text" name="description" value="${data[index].DESCRIPTION}"/>
                    </div>
                    <div class="input-container">
                        <p><span>Date</span></p>
                        <input disabled type="date" name="date" value="${data[index].DATE}" />
                    </div>
                </div>
                <div class="row create-form-button">
                    <button type="button" onclick="deleteList(${index})" data-index="${index}">Delete</button>
                    <button type="submit" onclick="editList(${index})" data-index="${index}">Edit Todo</button>
                </div>
            `;
            break;

        case "edit":
            console.info("Editing todo");
            overlay.classList.toggle("toggle-overlay");
            form_window.classList.toggle("toggle-window");
            fab_btn.disabled=true;

            mode="update";

            form.innerHTML="";
            form.innerHTML+=`
                <div class="row">
                    <div>
                        <button type="button" onclick="closeFormWindow()" title="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#22181C" fill-rule="evenodd" d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg>
                        </button>
                        <p><span>Editing Todo</span></p>
                    </div>
                    <hr>
                    <br>
                </div>
                <div class="row">
                    <div class="input-container">
                        <p><span>Title</span></p>
                        <input type="text" name="title" value="${data[index].TITLE}"/>
                    </div>
                    <div class="input-container">
                        <p><span>Description</span></p>
                        <input type="text" name="description" value="${data[index].DESCRIPTION}"/>
                    </div>
                    <div class="input-container">
                        <p><span>Date</span></p>
                        <input type="date" name="date" value="${data[index].DATE}" />
                    </div>
                </div>
                <div class="row create-form-button">
                    <button type="button" onclick="deleteList(${index})" data-index="${index}">Delete</button>
                    <button type="submit" onclick="updateIndex=${index}" data-index="${index}">Update Todo</button>
                </div>
            `;
        
            break;

        default:
            console.warn("Invalid parameter.");
            break;
    }
    return;
}

function returnView(index){
    console.info("Viewing todo");
    mode="view";

    form.innerHTML="";
    form.innerHTML+=`
        <div class="row">
            <div>
                <button type="button" onclick="closeFormWindow()" title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#22181C" fill-rule="evenodd" d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg>
                </button>
                <p><span>Editing Todo</span></p>
            </div>
            <hr>
            <br>
        </div>
        <div class="row">
            <div class="input-container">
                <p><span>Title</span></p>
                <input disabled type="text" name="title" value="${data[index].TITLE}"/>
            </div>
            <div class="input-container">
                <p><span>Description</span></p>
                <input disabled type="text" name="description" value="${data[index].DESCRIPTION}"/>
            </div>
            <div class="input-container">
                <p><span>Date</span></p>
                <input disabled type="date" name="date" value="${data[index].DATE}" />
            </div>
        </div>
        <div class="row create-form-button">
            <button type="button" onclick="deleteList(${index})" data-index="${index}">Delete</button>
            <button type="submit" onclick="editList(${index})" data-index="${index}">Edit Todo</button>
        </div>
    `;

    return;
}

function editList(index){
    console.info("Editing todo");
    mode="update";

    form.innerHTML="";
    form.innerHTML+=`
        <div class="row">
            <div>
                <button type="button" onclick="returnView(${index})" title="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#22181C" fill-rule="evenodd" d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg>
                </button>
                <p><span>Editing Todo</span></p>
            </div>
            <hr>
            <br>
        </div>
        <div class="row">
            <div class="input-container">
                <p><span>Title</span></p>
                <input type="text" name="title" value="${data[index].TITLE}"/>
            </div>
            <div class="input-container">
                <p><span>Description</span></p>
                <input type="text" name="description" value="${data[index].DESCRIPTION}"/>
            </div>
            <div class="input-container">
                <p><span>Date</span></p>
                <input type="date" name="date" value="${data[index].DATE}" />
            </div>
        </div>
        <div class="row create-form-button">
            <button type="button" onclick="deleteList(${index})" data-index="${index}">Delete</button>
            <button type="submit" onclick="updateIndex=${index}" data-index="${index}">Update Todo</button>
        </div>
    `;
    return;
}
function deleteList(index){
    data.splice(index, 1);
    list_container.innerHTML="";
    data.map((list, index)=>{
    list_container.innerHTML+=`
            <div class="list-box">
                <div class="column column-1">
                    <div class="info-box info-box-1">
                        <p><span>${list.TITLE}</span></p>
                    </div>
                    <div class="info-box info-box-2">
                        <p><span>${list.DESCRIPTION} - ${list.DATE}</span></p>
                    </div>
                </div>
                <div class="column column-2">
                    <button type="button" data-index="${index}" onclick="openFormWindow('view',${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="2"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g></svg>
                    </button>
                    <button type="button" data-index="${index}" onclick="openFormWindow('edit',${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><mask id="SVG8dJ0oeeE" width="15" height="15" x="4" y="5" fill="#000" maskUnits="userSpaceOnUse"><path fill="#fff" d="M4 5h15v15H4z"/><path d="m13.586 7.414l-7.194 7.194c-.195.195-.292.292-.36.41c-.066.119-.1.252-.166.52l-.664 2.654c-.09.36-.135.541-.035.641s.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167c.119-.067.216-.164.41-.359l7.195-7.194c.667-.666 1-1 1-1.414s-.333-.748-1-1.414l-.172-.172c-.667-.666-1-1-1.414-1s-.748.334-1.414 1"/></mask><g fill="none"><path stroke="#fff" stroke-width="2.7" d="m13.586 7.414l-7.194 7.194c-.195.195-.292.292-.36.41c-.066.119-.1.252-.166.52l-.664 2.654c-.09.36-.135.541-.035.641s.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167c.119-.067.216-.164.41-.359l7.195-7.194c.667-.666 1-1 1-1.414s-.333-.748-1-1.414l-.172-.172c-.667-.666-1-1-1.414-1s-.748.334-1.414 1Z" mask="url(#SVG8dJ0oeeE)"/><path fill="#fff" d="m12.5 7.5l3-2l3 3l-2 3z"/></g></svg>
                    </button>
                    <button type="button" data-index="${index}" onclick="deleteList(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/></svg>
                    </button>
                </div>
            </div> 
        `;
    });
    closeFormWindow();
    pop_up_alert("⚠ List has been deleted.");
    return;
}
function closeFormWindow(){
    overlay.classList.remove("toggle-overlay");
    form_window.classList.remove("toggle-window");
    fab_btn.disabled=false;
    form.innerHTML="";
}
function cancelCreating(){
    overlay.classList.remove("toggle-overlay");
    form_window.classList.remove("toggle-window");
    fab_btn.disabled=false;
    form.innerHTML="";
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    switch(mode){
        case "create":
            try{
                console.clear();
                console.info("creating todo");

                let inputNode = document.querySelectorAll("input");
                let title = inputNode[0].value.toLowerCase().trim();
                let description = inputNode[1].value.toLowerCase().trim();
                let date = inputNode[2].value.toLowerCase().trim();

                if(title===""||description===""||date===""){
                    pop_up_alert("⚠ Please fill all required fields.");
                    return false;
                }
                
                const duplicate = data.some(item => item.TITLE === title && item.DATE === date);
                if(duplicate){
                    pop_up_alert("⚠ List already exists.");
                    console.error("Duplicate.");
                    return false;
                }
                let list={TITLE:title, DESCRIPTION:description,DATE:date};
                data.push(list);
                console.info("List added.", data);

                list_container.innerHTML="";
                data.map((list, index)=>{
                    list_container.innerHTML+=`
                        <div class="list-box">
                            <div class="column column-1">
                                <div class="info-box info-box-1">
                                    <p><span>${list.TITLE}</span></p>
                                </div>
                                <div class="info-box info-box-2">
                                    <p><span>${list.DESCRIPTION} - ${list.DATE}</span></p>
                                </div>
                            </div>
                            <div class="column column-2">
                                <button type="button" data-index="${index}" onclick="openFormWindow('view',${index})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="2"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g></svg>
                                </button>
                                <button type="button" data-index="${index}" onclick="openFormWindow('edit',${index})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><mask id="SVG8dJ0oeeE" width="15" height="15" x="4" y="5" fill="#000" maskUnits="userSpaceOnUse"><path fill="#fff" d="M4 5h15v15H4z"/><path d="m13.586 7.414l-7.194 7.194c-.195.195-.292.292-.36.41c-.066.119-.1.252-.166.52l-.664 2.654c-.09.36-.135.541-.035.641s.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167c.119-.067.216-.164.41-.359l7.195-7.194c.667-.666 1-1 1-1.414s-.333-.748-1-1.414l-.172-.172c-.667-.666-1-1-1.414-1s-.748.334-1.414 1"/></mask><g fill="none"><path stroke="#fff" stroke-width="2.7" d="m13.586 7.414l-7.194 7.194c-.195.195-.292.292-.36.41c-.066.119-.1.252-.166.52l-.664 2.654c-.09.36-.135.541-.035.641s.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167c.119-.067.216-.164.41-.359l7.195-7.194c.667-.666 1-1 1-1.414s-.333-.748-1-1.414l-.172-.172c-.667-.666-1-1-1.414-1s-.748.334-1.414 1Z" mask="url(#SVG8dJ0oeeE)"/><path fill="#fff" d="m12.5 7.5l3-2l3 3l-2 3z"/></g></svg>
                                </button>
                                <button type="button" data-index="${index}" onclick="deleteList(${index})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/></svg>
                                </button>
                            </div>
                        </div> 
                    `;
                });
                return true;
            }
            catch{
                console.clear();
                console.warn("Invalid form.");
                return false;
            }     
        
        case "update":
            try{
                console.clear();
                console.info("updating todo");
                
                console.info(data[updateIndex]);
                let currentTitle = data[updateIndex].TITLE;
                let currentDescription = data[updateIndex].DESCRIPTION;
                let currentDate = data[updateIndex].DATE;

                let newTitle = document.querySelector("input[name='title']").value.toLowerCase().trim();
                let newDescription = document.querySelector("input[name='description']").value.toLowerCase().trim();
                let newDate = document.querySelector("input[name='date']").value.toLowerCase().trim();

                console.info(`CURRENT -> `, currentTitle, currentDescription, currentDate);
                console.info(`NEW -> `, newTitle, newDescription, newDate);
                
                if(newTitle === "" || newDescription === "" || newDate === ""){
                    closeFormWindow();
                    pop_up_alert("⚠ Please fill all required fields.");
                    return false;
                }

                if(newTitle === currentTitle && newDescription === currentDescription && newDate === currentDate){
                    closeFormWindow();
                    pop_up_alert("⚠ No changes made.");
                    return false; 
                }

                
                const listExists = data.filter(item => item.TITLE === newTitle && item.DATE === newDate).length;
                console.info("existing list: " + listExists);
                if(listExists === 1){
                    pop_up_alert("⚠ List already exists.");
                    return false; 
                }
                else{
                    let updatedData={
                        TITLE: newTitle,
                        DESCRIPTION: newDescription,
                        DATE: newDate,
                    }
                    data[updateIndex] = updatedData;
                    console.info("new data:", data);
                    closeFormWindow();
                    pop_up_update("🛈 Update Successful.");
                    
                    list_container.innerHTML="";
                    data.map((list, index)=>{
                        list_container.innerHTML+=`
                            <div class="list-box">
                                <div class="column column-1">
                                    <div class="info-box info-box-1">
                                        <p><span>${list.TITLE}</span></p>
                                    </div>
                                    <div class="info-box info-box-2">
                                        <p><span>${list.DESCRIPTION} - ${list.DATE}</span></p>
                                    </div>
                                </div>
                                <div class="column column-2">
                                    <button type="button" data-index="${index}" onclick="openFormWindow('view',${index})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="2"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g></svg>
                                    </button>
                                    <button type="button" data-index="${index}" onclick="openFormWindow('edit',${index})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><mask id="SVG8dJ0oeeE" width="15" height="15" x="4" y="5" fill="#000" maskUnits="userSpaceOnUse"><path fill="#fff" d="M4 5h15v15H4z"/><path d="m13.586 7.414l-7.194 7.194c-.195.195-.292.292-.36.41c-.066.119-.1.252-.166.52l-.664 2.654c-.09.36-.135.541-.035.641s.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167c.119-.067.216-.164.41-.359l7.195-7.194c.667-.666 1-1 1-1.414s-.333-.748-1-1.414l-.172-.172c-.667-.666-1-1-1.414-1s-.748.334-1.414 1"/></mask><g fill="none"><path stroke="#fff" stroke-width="2.7" d="m13.586 7.414l-7.194 7.194c-.195.195-.292.292-.36.41c-.066.119-.1.252-.166.52l-.664 2.654c-.09.36-.135.541-.035.641s.28.055.641-.035l2.655-.664c.267-.066.4-.1.518-.167c.119-.067.216-.164.41-.359l7.195-7.194c.667-.666 1-1 1-1.414s-.333-.748-1-1.414l-.172-.172c-.667-.666-1-1-1.414-1s-.748.334-1.414 1Z" mask="url(#SVG8dJ0oeeE)"/><path fill="#fff" d="m12.5 7.5l3-2l3 3l-2 3z"/></g></svg>
                                    </button>
                                    <button type="button" data-index="${index}" onclick="deleteList(${index})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/></svg>
                                    </button>
                                </div>
                            </div> 
                        `;
                    });
                    return true;   
                }
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
function pop_up_alert(message){
    console.warn("Form is Invalid");

    pop_up_content.innerHTML="";
    pop_up.classList.toggle("toggle-pop-up");
    pop_up_content.innerHTML+=`
        <div>
            <p><span> ${message} </span></p>
        </div>
    `;
    setTimeout(()=>{
        console.info("pop-up hidden");
        pop_up.classList.remove("toggle-pop-up");
        pop_up_content.innerHTML="";
    },3000);
}
function pop_up_update(message){
    console.warn("Form is Invalid");

    pop_up_content.innerHTML="";
    pop_up.classList.toggle("toggle-update");
    pop_up_content.innerHTML+=`
        <div>
            <p><span> ${message} </span></p>
        </div>
    `;
    setTimeout(()=>{
        console.info("pop-up hidden");
        pop_up.classList.remove("toggle-update");
        pop_up_content.innerHTML="";
    },3000);
}