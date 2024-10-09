import { useUserContext } from "../../../../context/UserContext";

const USerAvatar = () => {
  const {
    user: { avatar, name },
  } = useUserContext();
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative', userSelect: 'none'}}>
      <img
        src={avatar}
        alt={`Avatar - ${name}`}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
        }}
      />
      <span style={{margin:0, padding:0, fontWeight:700, fontSize:'20px', position:'absolute', color:'white', bottom:0}}>{name}</span>
    </div>
  );
};

export default USerAvatar;
