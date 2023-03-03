import clsx from "clsx";
import {makeStyles} from "@mui/styles";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea(props: IProps) {
  const {className, ...rest} = props;
  const c = useStyles();

  return <textarea className={clsx(c.textArea, className)} rows={6} {...rest} />;
}

const useStyles = makeStyles((theme) => ({
  textArea: {
    padding: "8px 8px",
    minHeight: 40,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 4,
    fontSize: ".875rem",
    border: "1px solid hsl(0, 0%, 80%)",
    resize: "none",
    letterSpacing: -0.8,
    "&:focus": {
      outline: "none !important",
      border: "1px solid hsl(0, 0%, 70%)",
    },
  },
}));
