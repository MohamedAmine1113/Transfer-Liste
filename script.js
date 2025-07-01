let btn_add = document.getElementById('add');
let input = document.getElementById('input');

let btn_all_right = document.getElementById('transfer_all_right');
let btn_right = document.getElementById('transfer_right');
let btn_left = document.getElementById('transfer_left');
let btn_all_left = document.getElementById('transfer_all_left');

let selectitem = null ;


let list_1 = [] ;
let list_2 = [] ;

if (localStorage.list_1_DB != null ){

    list_1 = JSON.parse(localStorage.list_1_DB);

}

if (localStorage.list_2_DB != null ){

    list_2 = JSON.parse(localStorage.list_2_DB);

}
     






btn_add.addEventListener('click',() =>{

    if(input.value === ''){
        return alert('Entre list')
    }

    list_1.push(input.value);
    localStorage.setItem('list_1_DB',JSON.stringify(list_1));

    Showlist('list_1','list1');
    ClearInput();
    
    
})


function Showlist(listname,elementId){

        let list = listname === "list_1" ?  list_1 : list_2;
        let li = '';
        for(let i = 0 ; i < list.length ; i++ ){
            li += `<li onclick ='selected(${listname},${[i]})'>
                        ${list[i]}
                    <i class='bx bx-x' onclick ='deleteList(${listname},${[i]})'></i>
                    <i class='bx bx-check'></i></li>`
            ;
            
        }
        
        document.getElementById(elementId).innerHTML = li;
    
}
Showlist('list_1','list1');
Showlist('list_2','list2');






function ClearInput(){

    input.value = '';

}


function deleteList(listname,value){


    if(listname === list_1){
        listname.splice(value, 1); // Remove item from the array
        localStorage.list_1_DB = JSON.stringify(listname);
        
    }else{
        listname.splice(value, 1); // Remove item from the array
        localStorage.list_2_DB = JSON.stringify(listname);
        listname = list_1;
    }
   
    Showlist('list_1','list1');
    Showlist('list_2','list2');
    
}





btn_all_right.addEventListener('click',() =>{

    if(list_1.length <= 0){
        return alert('List is empty');
    }

    for(let i = 0 ; i < list_1.length ; i++ ){
        list_2.push(list_1[i]);
    } 
    
    list_1.splice(list_1)
    localStorage.list_1_DB = JSON.stringify(list_1);
    localStorage.setItem('list_2_DB',JSON.stringify(list_2));

    Showlist('list_1','list1');
    Showlist('list_2','list2');
    
    ClearInput();

    selectitem = null ;
})

btn_all_left.addEventListener('click',() =>{

    if(list_2.length <= 0){
        return alert('List is empty');
    }

    for(let i = 0 ; i < list_2.length ; i++ ){
        list_1.push(list_2[i]);
    } 
    
    list_2.splice(list_2);
    localStorage.list_2_DB = JSON.stringify(list_2);
    localStorage.setItem('list_1_DB',JSON.stringify(list_1));

    Showlist('list_1','list1');
    Showlist('list_2','list2');
    
    ClearInput();

    selectitem = null ;
})






function selected(listname,index){
    selectitem = {listname , index};
}



btn_right.addEventListener('click',()=>{

    if(selectitem === null){
        return alert('Select an item first')
    }

    if(selectitem.listname === list_1){

        // Move item from list_1 to list_2
        let item = list_1.splice(selectitem.index,1)[0];
        list_2.push(item);

        // Update localStorage
        localStorage.list_2_DB = JSON.stringify(list_2);
        localStorage.list_1_DB = JSON.stringify(list_1);
        

        Showlist('list_2','list2');
        Showlist('list_1','list1');

        selectitem = null ;

        
    }
})


btn_left.addEventListener('click',()=>{

    

    if(selectitem === null){
        return alert('Select an item first')
    }

    if(selectitem.listname === list_2){

        // Move item from list_1 to list_2
        let item = list_2.splice(selectitem.index,1)[0];
        list_1.push(item);

        // Update localStorage
        localStorage.list_2_DB = JSON.stringify(list_2);
        localStorage.list_1_DB = JSON.stringify(list_1);
        

        Showlist('list_2','list2');
        Showlist('list_1','list1');

        selectitem = null ;

        
    }
})



