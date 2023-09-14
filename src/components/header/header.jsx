import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { v4 } from 'uuid';
import { useState } from 'react';
import { createUser, showUser, userActionst } from '../../store/slice/users';
import { useDispatch, useSelector } from 'react-redux';
import './header.css';
import { convertorDateToDay } from '../../utils/utils';

function Header() {
  const [active, SetActive] = useState(false);
  const dispatch = useDispatch();
  const { users, dateForSort } = useSelector((state) => state.users);

  const id = v4();

  const handleOpenbtn = () => {
    if (active) {
      document.querySelector('.addform').style.display = 'none';
      SetActive(false);
    } else {
      document.querySelector('.addform').style.display = 'block';
      SetActive(true);
    }
  };
  const handlesortByDate = (e) => {
    e.preventDefault();
    let sortedUser = dateForSort.slice();
    if (e.target.value == 'old') {
      sortedUser.sort(function (a, b) {
        return (
          convertorDateToDay(a.finish_day) - convertorDateToDay(b.finish_day)
        );
      });
      dispatch(userActionst.sortUser(sortedUser));
    } else if (e.target.value == 'new') {
      sortedUser.sort(function (a, b) {
        return (
          convertorDateToDay(b.finish_day) - convertorDateToDay(a.finish_day)
        );
      });
      dispatch(userActionst.sortUser(sortedUser));
    } else {
      dispatch(userActionst.sortUser(dateForSort));
    }
  };

  const handlesortByType = (e) => {
    e.preventDefault();
    if (e.target.value == 'default') {
      dispatch(userActionst.sortUser(dateForSort));
    } else {
      const sortedUser = dateForSort.filter(
        (n) => n.License_type == e.target.value,
      );
      dispatch(userActionst.sortUser(sortedUser));
    }
  };

  const handlesortByRegion = (e) => {
    e.preventDefault();
    if (e.target.value == 'default') {
      dispatch(userActionst.sortUser(dateForSort));
    } else {
      const sortedUser = dateForSort.filter((n) => n.region == e.target.value);
      dispatch(userActionst.sortUser(sortedUser));
    }
  };

  const handleSearchForm = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    if (+lowerCase.split('')[2]) {
      const filteredData = dateForSort.filter((el) => {
        return el.passport_seria.toLowerCase().includes(lowerCase);
      });
      dispatch(userActionst.sortUser(filteredData));
    } else {
      const filteredData = dateForSort.filter((el) => {
        if (lowerCase === '') {
          return el;
        } else {
          return el.full_name.toLowerCase().includes(lowerCase);
        }
      });
      dispatch(userActionst.sortUser(filteredData));
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (
      e.target.name.value &&
      e.target.passport.value &&
      e.target.get_date.value &&
      e.target.finish_day.value &&
      e.target.region.value
    ) {
      const newUser = {
        id,
        full_name: e.target.name.value,
        passport_seria: e.target.passport.value,
        date_birth: e.target.date_birth.value,
        region: e.target.region.value,
        get_date: e.target.get_date.value,
        finish_day: e.target.finish_day.value,
        License_type: e.target.License_type.value,
      };

      dispatch(createUser(newUser));
      handleOpenbtn();
      (e.target.name.value = null),
        (e.target.passport.value = null),
        (e.target.date_birth.value = null),
        (e.target.get_date.value = null),
        (e.target.region.value = 'Toshkent sh');
      (e.target.finish_day.value = null), (e.target.License_type.value = 'A');
    } else {
      alert(
        'Ism , Pasport seriya, Viloyat, litsenziya berilgan sana yoki litsenziya tugashi kiritilmagan',
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Form className="addform" onSubmit={handleAddTodo}>
          <button
            style={{ marginLeft: '400px', marginTop: '10px' }}
            onClick={handleOpenbtn}
            type="button"
            class="btn btn-danger"
          >
            Close
          </button>
          <FormGroup className="divForm">
            <Label htmlFor="name" className="">
              Full Name
            </Label>
            <Input
              className="input"
              id="name"
              name="name"
              placeholder="Name and Surname"
              type="text"
            />
          </FormGroup>
          <FormGroup className="divForm">
            <Label htmlFor="examplePassport">Passport Seria</Label>
            <Input
              id="examplePassport"
              name="passport"
              placeholder="passport Seria"
              type="text"
            />
          </FormGroup>

          <FormGroup className="divForm">
            <Label htmlFor="exampleSelect">Viloyati</Label>
            <Input
              id="exampleSelect"
              name="region"
              type="select"
              defaultValue={'Toshkent sh'}
              className="edit_License_type"
            >
              <option>Toshkent sh</option>
              <option>Toshkent</option>
              <option>Andijon</option>
              <option>Buxoro</option>
              <option>Fargʻona</option>
              <option>Xorazm</option>
              <option>Namangan</option>
              <option>Navoiy</option>
              <option>Qashqadaryo</option>
              <option>Qoraqalpogʻiston</option>
              <option>Sirdaryo</option>
              <option>Surxondaryo</option>
            </Input>
          </FormGroup>

          <FormGroup className="divForm">
            <label htmlFor="date" style={{ marginRight: '30px' }}>
              Tug'ulgan kuni :
            </label>
            <input type="date" id="date" name="date_birth" />
          </FormGroup>

          <FormGroup className="divForm">
            <label htmlFor="date" style={{ marginRight: '30px' }}>
              Litsenziya Berilgan Sanasi :
            </label>
            <input type="date" id="date" name="get_date" />
          </FormGroup>

          <FormGroup className="divForm">
            <label htmlFor="date" style={{ marginRight: '30px' }}>
              Litsenziya Tugash Sanasi :
            </label>
            <input type="date" id="date" name="finish_day" />
          </FormGroup>
          <FormGroup className="divForm">
            <Label htmlFor="exampleSelect">Litsenziya turi</Label>
            <Input
              id="exampleSelect"
              name="License_type"
              type="select"
              defaultValue={'A'}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>PRO</option>
            </Input>
          </FormGroup>

          <Button className="add-btn">Submit</Button>
        </Form>

        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={{ display: 'flex', justifyContent: 'space-around' }}
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <select
              className="form-select"
              onChange={handlesortByDate}
              name="sortDate"
              style={{ maxWidth: 200 }}
              aria-label="Default select example "
            >
              <option defaultValue={() => {}} value="default">
                Data sort
              </option>
              <option value="old">Old</option>
              <option value="new">New</option>
            </select>
            <select
              className="form-select"
              onChange={handlesortByType}
              name="sortType"
              style={{ maxWidth: 200 }}
              aria-label="Default select example "
            >
              <option defaultValue={() => {}} value="default">
                Litsenziya turlari
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="PRO">PRO</option>
            </select>
            <select
              className="form-select"
              onChange={handlesortByRegion}
              name="sortDate"
              style={{ maxWidth: 200 }}
              aria-label="Default select example "
            >
              <option defaultValue={() => {}} value="default">
                Viloyatlar
              </option>
              <option value="Toshkent sh">Toshkent sh</option>
              <option value="Toshkent">Toshkent</option>
              <option value="Andijon">Andijon</option>
              <option value="Buxoro">Buxoro</option>
              <option value="Fargʻona">Fargʻona</option>
              <option value="Xorazm">Xorazm</option>
              <option value="Namangan">Namangan</option>
              <option value="Navoiy">Navoiy</option>
              <option value="Qashqadaryo">Qashqadaryo</option>
              <option value="Qoraqalpogʻiston">Qoraqalpogʻiston</option>
              <option value="Sirdaryo">Sirdaryo</option>
              <option value="Surxondaryo">Surxondaryo</option>
            </select>
            <form className="d-flex" onChange={handleSearchForm}>
              <input
                style={{ width: 600 }}
                name="search"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleOpenbtn}
            >
              Add User
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
