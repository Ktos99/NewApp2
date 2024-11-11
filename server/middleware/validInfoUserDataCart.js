module.exports = function(req, res, next) {
    const { user_name, user_lastname } = req.body;
    

    function validName(user_name) {
      return /^[A-Za-z]+$/.test(user_name);
    }

    function validLastName(user_lastname) {
      return /^[A-Za-z]+$/.test(user_lastname);
    }


    
  
    if (req.path === "/changeuserdata") {
      if (![user_name, user_lastname].every(Boolean)) {
        return res.status(401).json("Wszystkie pola muszą być uzupełnione");
        } else if (user_name.length < 2 || user_name.length > 30) {
            return res.status(401).json("Imię musi zawierać od 2 do 30 znaków.");
        } else if (user_lastname.length < 2 || user_lastname.length > 30) {
            return res.status(401).json("Nazwisko musi zawierać od 2 do 30 znaków.");
        } else if (!validName(user_name)) {
          return res.status(401).json("Imię musi zaczynać się z dużej litery oraz nie może mieć spacji");
        }else if (!validLastName(user_lastname)) {
          return res.status(401).json("Nazwisko musi zaczynać się z dużej litery oraz nie może mieć spacji");
        }
    } 
  
    next();
  };