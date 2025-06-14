

interface props{
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=> void,
}

const Input = (props:props) => {
  return (
       <input placeholder={props.placeholder} onChange={props.onChange}/>
  );
};

export default Input;