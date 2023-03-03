import clsx from "clsx";
import {makeStyles} from "@mui/styles";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: IProps) {
  const {className, ...rest} = props;
  const c = useStyles();

  return (
    <input
      className={clsx(
        rest.type === "date" || rest.type === "time" ? c.dateTimeInput : c.textInput,
        className
      )}
      {...rest}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  dateTimeInput: {
    fontSize: 16,
    padding: 8,
    fontWeight: 400,
    fill: "red",
    border: "1px solid hsl(0, 0%, 80%)",
    outline: "none",
    backgroundColor: "#eee",
    borderRadius: 4,
    cursor: "pointer",
    width: "100%",
    height: 40,
  },
  textInput: {
    padding: "8px 8px",
    minHeight: 40,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 4,
    fontSize: ".875rem",
    letterSpacing: 0.2,
    border: "1px solid hsl(0, 0%, 80%)",
    "&:focus": {
      outline: "none !important",
      border: "1px solid hsl(0, 0%, 70%)",
    },
  },
}));
