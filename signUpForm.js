import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
//----------------------------------------
export default function SignUpForm(props) {
 const [redirect, setRedirect] = useState(null);
 const checkIfAdmin = () => {
 var currentAccountIsAdmin = false;
 var currentAccountInfo = sessionStorage.getItem('currentAccountInfo');
 if(currentAccountInfo){
 currentAccountInfo = JSON.parse(currentAccountInfo);
 currentAccountIsAdmin = currentAccountInfo.isAdmin;
 }
 return currentAccountIsAdmin;
 }
 
 const goToAccountSetting = () => {
 setRedirect(<Redirect to='/account-setting' />);
 }
 const goToLogIn = () => {
 setRedirect(<Redirect to='/account-setting/log-in' />);
 }
 const sendData = async (e) => {
 e.preventDefault();
 const formData = e.target;
 const data = 
 {
 isAdmin: formData['isAdmin'].checked,
 email: formData['email'].value,
 name: formData['name'].value,
 password: formData['password'].value,
 };
 console.log(data);
 
 const resp = await fetch('api/accounts', {

 method: 'POST',
 body: JSON.stringify(data),
 headers: {'Content-Type':'application/json'}
 });
 console.log(resp.status);
 goToAccountSetting();
 }
 const currentIsAdmin = checkIfAdmin();
 return redirect ? redirect : (
 <Row className="justify-content-center bg-light shadow text-primary">
 <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
 <div class="text-center lead">
 <h1>Welcome!</h1>
 <p>Register a new account or log in!</p>
 </div>
 <Stack class="mx-auto">
 <Form onSubmit={sendData} className='pb-5'>
 <Form.Label for="name" class="form-label">Full Name : 
</Form.Label>
 <Form.Control type="text" placeholder="firstname + lastname"
name="name" pattern='^[A-Za-z]+$'/>
 
<Form.Label for="email" class="form-label">Email : </Form.Label>
 <Form.Control id="email" name='email'
placeholder="example@gmail.com" pattern='^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$'/>
 <Form.Label for="password" class="form-label">Password : 
</Form.Label>
 <Form.Control type='password' minLength={4} maxLength={12} 
name='password' placeholder="password"/>
 <Form.Check label='Admin status' name="isAdmin" className={'form-check-inline mt-3 mx-0' + 
 (currentIsAdmin ? '' : ' d-none')}/>
 <Form.Group class="text-center my-3">
 <Button type="submit" name="submit" className="shadow"
variant="outline-primary">Submit</Button>
 </Form.Group>
<Form.Group class="text-center my-3">
 <Button size='sm' className="shadow" onClick={() => 
goToLogIn()} type='button' name="logIn" variant="outline-primary">LogIn</Button>
 </Form.Group>
 </Form>
 </Stack>
 </Col>
 </Row> 
 );
}
