import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProfile } from '../../redux/reducers/profileSlice';
import TextInput from '../TextInput/Textinput';
import Button from '../Button/Button';

export default function EditButton() {
	const token = useSelector(state => state.userAuth.token);
	const profile = useSelector(state => state.profile);
	const [isEditing, setIsEditing] = useState(false);
	const [newUserName, setNewUserName] = useState(profile.userName);
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		setNewUserName(profile.userName);
	}, [profile.userName]);

	const editUserName = async e => {
		e.preventDefault();
		if (!newUserName) {
			setError('The field cannot be empty.');
			return;
		}
		try {
			const response = await fetch(
				'http://localhost:3001/api/v1/user/profile',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ userName: newUserName }),
				},
			);
			if (!response) {
				throw new Error("Échec de la mise à jour du nom d'utilisateur");
			}
			dispatch(setEditProfile(newUserName));
			setIsEditing(false);
		} catch (err) {
			console.log(err);
		}
	};

	const cancelEdit = () => {
		setIsEditing(false);
		setNewUserName(profile.userName);
		setError('');
	};

	return (
		<div>
			{isEditing ? (
				<div>
					<TextInput
						label="Username"
						id="username"
						type="text"
						autoComplete="username"
						onChange={e => {
							setNewUserName(e.target.value);
							setError('');
						}}
						value={newUserName}
					/>
					{error && <p className="error-message">{error}</p>}
					<br />
					<TextInput
						label="First Name"
						id="firstName"
						type="text"
						autoComplete="given-name"
						onChange={e => {}}
						value={profile.firstName}
						disabled
						className="disabled-input" // Ajout de la classe pour les styles CSS
					/>
					<br />
					<TextInput
						label="Last Name"
						id="lastName"
						type="text"
						autoComplete="family-name"
						onChange={e => {}}
						value={profile.lastName}
						disabled
						className="disabled-input" // Ajout de la classe pour les styles CSS
					/>
					<br />
					<Button className="edit-button" onClick={editUserName}>
						Save
					</Button>
					<Button className="edit-button" onClick={cancelEdit}>
						Cancel
					</Button>
				</div>
			) : (
				<div>
					<p>First Name: {profile.firstName}</p>
					<p>Last Name: {profile.lastName}</p>
					<Button className="edit-button" onClick={() => setIsEditing(true)}>
						Edit UserName
					</Button>
				</div>
			)}
		</div>
	);
}
