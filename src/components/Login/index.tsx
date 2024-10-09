import { useState } from "react";
import { Form, NameInput, NameWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { avatars } from "../../Constants/avatars";

const Login = () => {
  const [initials, setInitials] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (initials.length === 2 && selectedAvatar) {
      console.log('Form submitted:', { initials, selectedAvatar });

      const avatarSrc = avatars.find((avatar) => avatar.id === selectedAvatar)?.src || '';

      updateUser({
        name: initials,
        avatar: avatarSrc,
        isLogued: true,
      });

      navigate('/game');
    } else {
      alert('Ingresa tus iniciales y selecciona un avatar.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <NameWrapper>
        <label htmlFor="initials">Ingresa tus iniciales</label>
        <NameInput
          id="initials"
          value={initials}
          onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 2))}
          placeholder="XX"
          maxLength={2}
          required
        />
      </NameWrapper>

      {selectedAvatar !== '' ? (
        <img
          src={avatars[parseInt(selectedAvatar) - 1].src}
          alt="Avatar seleccionado"
          style={{ margin: '0 auto' }}
        />
      ) : (
        <div
          style={{
            width: '192px',
            height: '192px',
            margin: '0 auto',
            background: '#8b8b8b96',
            borderRadius: '50%',
            color: 'wheat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Selecciona un avatar
        </div>
      )}

      <div>
        <label>Selecciona un avatar</label>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input
                type="radio"
                value={avatar.id}
                id={`avatar-${avatar.id}`}
                name="avatar"
                onChange={() => setSelectedAvatar(avatar.id)}
                style={{ display: 'none' }} // Ocultar el input radio
              />
              <label
                htmlFor={`avatar-${avatar.id}`}
                style={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  padding: '4px',
                }}
              >
                <img
                  src={avatar.src}
                  alt={`Avatar ${avatar.id}`}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    boxShadow: selectedAvatar === avatar.id ? '0 0 4px 4px rgba(0, 113, 243, 0.767)' : 'none',
                  }}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        style={{
          marginTop: '24px',
          width: '100%',
          padding: '12px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </Form>
  );
};

export default Login;
