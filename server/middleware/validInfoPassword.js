module.exports = function(req, res, next) {
    const { oldpassword, newpassword, passwordcheck } = req.body;
    
  
    
    function validdPassword(userPassword) {
      return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(userPassword);
    }
  
    if (req.path === "/changepassword") {
      if (![oldpassword, newpassword, passwordcheck].every(Boolean)) {
        return res.status(401).json("Wszystkie pola muszą być uzupełnione");
      } else if (oldpassword === newpassword) {
        return res.status(401).json("Nowe hasło musi być inne od starego hasła");
      } else if (!validdPassword(newpassword)) {
        return res.status(401).json("Hasło musi zawierać od 8 do 20 znaków, minimum jeden znak specjalny oraz dużą i małą literę");
      } else if (newpassword !== passwordcheck) {
        return res.status(401).json("Hasła muszą być identyczne!");
      } 
    } 
  
    next();
  };