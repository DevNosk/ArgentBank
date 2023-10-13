import { Link } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.webp';

export default function Header() {
	return (
		<header>
			<nav className="main-nav">
				<Link className="main-nav-logo" to="./">
					<img
						className="main-nav-logo-image"
						src={logo}
						alt="Argent Bank Logo"
					/>
					<h1 className="sr-only">Argent Bank</h1>
				</Link>
				<div>
					<Link className="main-nav-item" to="./sign-in/">
						<i className="fa fa-user-circle"></i>
						&nbsp;Sign In
					</Link>
				</div>
			</nav>
		</header>
	);
}
