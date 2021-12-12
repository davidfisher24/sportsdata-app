import React from "react";

const Error = () => { 
  return (
    <div className="container" data-testid="error-container">
        <div className="row">
            <div className="col-md-12">
                <h1>Oops!</h1>
                <h2>Something went wrong</h2>
                <div>
                    Sorry, an error has occured, Please try again later!
                </div>
            </div>
        </div>
    </div>
  );
}

export default Error;