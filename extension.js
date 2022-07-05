
let myLeads = []
const inputEl = document.getElementById("input-element")
const inputButton = document.getElementById("input-button")  
const ulEl = document.getElementById("ul-el")  
let deleteButton = document.getElementById("delete-button")
const tabButton = document.getElementById("tab-button")
 
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 
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
    myLeads.push(inputEl.value)            
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))  
    render(myLeads)
    
    
}) 
deleteButton.addEventListener("dblclick", function(){     
    localStorage.clear()  
    myLeads = []
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

