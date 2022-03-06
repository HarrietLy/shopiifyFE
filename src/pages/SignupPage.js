function SignupPage() {
  return (
    <div>
      <h1> Welcome to Shopiify Sign Up Page</h1>
      <button type="button" class="btn btn-primary">Primary</button>

      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>

    
  );
}

export default SignupPage;
