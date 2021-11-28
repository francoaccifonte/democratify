import {
  RouteComponentProps,
  useHistory
} from "react-router-dom";

type TParams = { id: string };

const VotationView = ({ match }: RouteComponentProps<TParams>) => {
  const routeId = Number(match.params.id);

  return(
    <div>
      votation view {`${routeId}`}
    </div>
  )
}

export default VotationView
