
let myLeads = []
const inputEl = document.getElementById("input-element")
const inputButton = document.getElementById("input-button")  
const ulEl = document.getElementById("ul-el")  
let deleteButton = document.getElementById("delete-button")
const tabButton = document.getElementById("tab-button")
 
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage 
    render(myLeads)
} 

tabButton.addEventListener("click", function(){    
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
       myLeads.push(tabs[0].url)                
       localStorage.setItem("myLeads", JSON.stringify(myLeads))  
       render(myLeads)
    })   
})

inputButton.addEventListener("click", function(){  
   let isUrl = validateUrl(myLeads);
     if (isUrl) {    
        myLeads.push(inputEl.value)                   
        inputEl.value = ""      
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
        render(myLeads)     
    } else {
        alert("Invalid URL");
    }
 })     
    
deleteButton.addEventListener("dblclick", function(){     
    localStorage.clear()  
    myLeads = []
    myLeads.push(inputEl.value) 
    render(myLeads)
  
 }) 

function render(leads) {
let listItems = ""
for (i = 0; i < leads.length; i++){
    //listItems += "<li>"  + "<a target'=_blank' href = >" + myLeads[i]  + "</li>"  
    listItems += 
    `<li> 
        <a target ='_blank' href = ${leads[i]}>
        ${leads[i]}
        </a>  
    
    </li>`
    
    ulEl.innerHTML = listItems 
}
} 
function validateUrl(myLeads){
      regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      regexp.test(myLeads) 
}



