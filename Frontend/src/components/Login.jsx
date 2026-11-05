import { useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate
import './login.css';
import logoRiblue from '../assets/logo/logo.jpeg';
function Login() {

    const navigate = useNavigate(); //2. Inicializamos el navegador

    //3. Creamos la función que maneja el envío
    const handleLogin = (e) => {
        e.preventDefault(); //Evita que la página se recargue y se borren los datos
        
        // Por ahora, solo simulamos que fue exitoso y navegamos al menú:
        navigate('/menu'); 
    }

    return (
        <div className="container">
            <div className="login-left">
                <div className="login-card">{/* esto es para la tarjeta de login */}
                    <div className="login-logo"> {/* esto es para el logo encima de la tarjeta de login */}
                        <img src={logoRiblue} alt="Logo de Riblue" />
                    </div>
                    <h1>Bienvenido a Riblue</h1>
                    <p>Por favor, inicia sesión para continuar.</p>

                     {/*4. Agregamos el onSubmit al form */}
                    <form onSubmit={handleLogin}>
                        <div className="login-email">
                            <label>Email</label>
                            <input type = "email" placeholder='awsdf@mail.com' required/>   
                        </div> 
                        <div className='login-password'>
                            <label>Contraseña</label>
                            <input type='password' placeholder='******' required/>

                        </div>
                        <button type='submit' className='btn-entrar'>Entrar</button>
                    </form>
                </div>
            </div>
            <div className="login-right">

            </div>
        </div>
    )

}
export default Login; 