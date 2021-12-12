import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { retrieveSports } from "../actions";
import Loader from './loader.component'
import Error from './error.component'
import "../translations/i18n";

const SportsList = (state) => { 
  const { sports: sportsData, retrieveSports } = state;
  const { data: sports, error } = sportsData;
  const { t } = useTranslation();

  useEffect(() => {
    retrieveSports()
    //eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  if (error) return (<Error />)

  return (
    <div>
      {sports ? (
        <div className="list row">
          <div className="col-md-8">
            <h1 className="h4">{t("sports_list")}</h1>

            <ul className="list-group">
              {sports &&
                sports.map((sport) => (
                  <Link
                    to={"/sports/" + sport.id}
                    key={sport.id}
                  >
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      {t(sport.desc)}
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sports: state.sports,
  };
};

export default connect(mapStateToProps, { retrieveSports })(SportsList);
