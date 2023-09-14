import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, FormGroup, Input, Label, Table } from "reactstrap"
import { deleteUser, showUser, updateUser } from "../store/slice/users"
import { convertorDateToDay } from "../utils/utils"


function Home() {
    const [active , SetActive] = useState(false)
    const dispatch = useDispatch();
    const datenow = new Date()
    const dateFormat = `${datenow.getFullYear()}-${datenow.getMonth()+1 > 10 ?datenow.getMonth()+1 : `0${datenow.getMonth()+1}`  }-${datenow.getDate()}`


    const { users , loading } = useSelector((state) => state.users)

    
    useEffect(() => {
        dispatch(showUser());
    }, []);
    
    

    const handleEditOpenBtn = ( id , active) => {
        if(active) {    
            document.querySelector(".editForm").style.display = 'block'
            const findUser = users.find(e => e.id == id )
            document.querySelector(".editForm").dataset.id = findUser.id
            document.querySelector('.edit_full_name').value = findUser.full_name
            document.querySelector('.edit_passport').value = findUser.passport_seria
            document.querySelector('.edit_date_birth').value = findUser.date_birth
            document.querySelector('.edit_get_date').value = findUser.get_date
            document.querySelector('.edit_finish_day').value = findUser.finish_day
            document.querySelector('.edit_License_type').value = findUser.License_type

        } else {
            document.querySelector(".editForm").style.display = 'none'

        }
    } 

    const handlEditBtn = (e) => {
        e.preventDefault();
        if( e.target.name.value && e.target.passport.value && e.target.get_date.value  &&  e.target.finish_day.value &&  e.target.region.value){
            const EditUser = {
              id: e.target.dataset.id,
              full_name: e.target.name.value,
              passport_seria: e.target.passport.value ,
              date_birth: e.target.date_birth.value ,
              region :  e.target.region.value,
              get_date: e.target.get_date.value  ,
              finish_day : e.target.finish_day.value,
              License_type : e.target.License_type.value
            };
            dispatch(updateUser(EditUser));
            handleEditOpenBtn(null , false)
    }else {
        alert("Ism , Pasport seriya, Viloyat, litsenziya berilgan sana yoki litsenziya tugashi kiritilmagan")
      }
}
    const handleDeleteBtn = (id) => {
        dispatch(deleteUser(id))
    }  
    if (loading) {
        return <h2>Loading</h2>;
      }
      
    return(
        <div>
             <Form className="addform editForm" onSubmit={handlEditBtn} >   
                    <button style={{marginLeft : "400px" , marginTop: "10px"}} onClick={handleEditOpenBtn.bind(null ,null , false)} type="button" class="btn btn-danger">Close</button>
                <FormGroup className="divForm"> 
                    <Label htmlFor="name" className="Labeltag">
                    Full Name
                    </Label>
                    <Input className="input edit_full_name"
                    id="name"
                    
                    name="name"
                    placeholder="Name and Surname"
                    type="text"
                    />
                </FormGroup >
                <FormGroup className="divForm">
                    <Label htmlFor="examplePassport">
                    Passport Seria
                    </Label>
                    <Input 
                    className="edit_passport"
                    id="examplePassport"
                    name="passport"
                    placeholder="passport Seria"
                    type="text"
                    />
                </FormGroup >

                <FormGroup className="divForm">
                    <Label htmlFor="exampleSelect">
                        Viloyati
                    </Label>
                    <Input
                    id="exampleSelect"
                    name="region"
                    type="select"
                    defaultValue={"Toshkent sh"}
                    className="edit_License_type"
                    >
                    <option>
                        Toshkent sh
                    </option>
                    <option>
                        Toshkent 
                    </option>
                    <option>
                        Andijon 
                    </option>
                    <option>
                    Buxoro
                    </option>
                    <option>
                    Fargʻona
                    </option>
                    <option>
                    Xorazm
                    </option>
                    <option>
                    Namangan
                    </option>
                    <option>
                    Navoiy
                    </option>
                    <option>
                    Qashqadaryo
                    </option>
                    <option>
                    Qoraqalpogʻiston
                    </option>
                    <option>
                    Sirdaryo
                    </option>
                    <option>
                    Surxondaryo
                    </option>
                    </Input>
                </FormGroup>

                <FormGroup className="divForm">
                <label htmlFor="date" style={{marginRight: "30px"}}>Tug'ulgan kuni :</label>
                <input type="date" id="date" name="date_birth" className="edit_date_birth"/>
                </FormGroup >

                <FormGroup className="divForm">
                <label htmlFor="date" style={{marginRight: "30px"}}>Litsenziya Berilgan Sanasi :</label>
                <input type="date" id="date" name="get_date" className="edit_get_date" />
                </FormGroup >

                <FormGroup className="divForm">
                <label htmlFor="date" style={{marginRight: "30px"}}>Litsenziya Tugash Sanasi :</label>
                <input type="date" id="date" name="finish_day" className="edit_finish_day" />
                </FormGroup >
                <FormGroup className="divForm">
                    <Label htmlFor="exampleSelect">
                    Litsenziya turi 
                    </Label>
                    <Input
                    id="exampleSelect"
                    name="License_type"
                    type="select"
                    defaultValue={"A"}
                    className="edit_License_type"
                    >
                    <option>
                        A
                    </option>
                    <option>
                        B
                    </option>
                    <option>
                        C
                    </option>
                    <option>
                        D
                    </option>
                    <option>
                        PRO
                    </option>
                    </Input>
                </FormGroup>
                
                
                <Button className="add-btn" >
                    Submit
                </Button>
                </Form>

           <Table bordered>
                <thead>
                    <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Full Name
                    </th>
                    <th>
                    Passport seria
                    </th>
                    <th>
                        Tug'ilgan kun
                    </th>
                    <th>
                        Viloyat
                    </th>
                    <th>
                        Berilgan kuni
                    </th>
                    <th>
                        Tugash kuni
                    </th>
                    <th>
                        Turi
                    </th>
                    <th style={{width : "100px"}}>
                        O'zgartirish
                    </th> 
                    <th style={{width : "80px"}}>
                        O'chirish
                    </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.length ? users.map((e, i) => (
                            <tr key={i} style={
                                convertorDateToDay(e.finish_day) - convertorDateToDay(dateFormat) < 0 ?  {backgroundColor: "red"}:  convertorDateToDay(e.finish_day) - convertorDateToDay(dateFormat) < 150 ? {backgroundColor: "orange"}:null}>
                                
                                
                            <th scope="row">
                                {i}
                            </th>
                            <td>
                                {e.full_name}
                            </td>
                            <td>
                            {e.passport_seria}

                            </td>
                            <td>
                            {e.date_birth}

                            </td>
                            <td>
                            {e.region}

                            </td>
                            <td>
                            {e.get_date}

                            </td>
                            <td>
                            {e.finish_day}

                            </td>
                            <th>
                            {e.License_type}

                            </th>
                            <td style={{padding :"2px"}}>
                            <button
                                className="btn btn-primary "
                                style={{margin : "0px 23px "}}
                                id={e.id}
                                onClick={handleEditOpenBtn.bind(null, e.id ,true)}
                            >
                                Edit
                            </button> 

                            </td>
                            <td style={{padding :"2px"}}>
                            <button
                                className="btn btn-danger "
                                style={{margin : "0px 8px "}}
                                id={e.id}
                                onClick={handleDeleteBtn.bind(null, e.id)}
                            >
                                Delete
                            </button> 

                            </td>


                            </tr>)
                        ) :null
                    }

                  
                </tbody>
            </Table>      
        </div>
    ) 
}


export default Home