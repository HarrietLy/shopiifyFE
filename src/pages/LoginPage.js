function LoginPage() {
    return (
      <div>
          <h1> Welcome to Shopiify Login Page</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="email" className="form-control" id="password"/>
          </div>
  
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
  
      </div>
  
      
    );
  }
  
  export default LoginPage;
  