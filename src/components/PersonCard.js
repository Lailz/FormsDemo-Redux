const PersonCard = ({ person }) => (
  <div className="col-12 col-md-3">
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{person.alias}</h3>
        <p className="text-muted">{person.email}</p>
        <p className="card-text">{person.description}</p>
      </div>
    </div>
  </div>
);

export default PersonCard;
