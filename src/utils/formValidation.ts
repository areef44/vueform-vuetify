export const isRequired = (v: any): boolean | string => {
    if(v) {
        return true
    } else {
        return 'Field is required'
    }
}

export const usernameCharacterLength = (v: any) : boolean | string => {
    if(v.length > 8) {
        return true
    } else {
        return 'Must be more than 8 characters'
    }
} 

export const formTitle = (v: any) : boolean | string => {
  if(v.length < 256) {
      return true
  } else {
      return `Must be less than 255 characters, reduce by ${255 - v.length } characters`
  }
} 

export const isPhoneNumberValid = (v: any) : boolean | string => {
    const mustBeNumber = /^[0-9]*$/;
    const firstTwoDigit = v.toString().slice(0,2) 
    
    if(firstTwoDigit !== '08') {
        return 'Wrong phone number format'
    }
    if(!mustBeNumber.test(v)) {
        return 'Phone number must use numerical characters'
    }

    if( v.length <= 10) {
        return 'Phone number must contain 10 - 13 digits'
    } 

    if(v.length >= 13) {
        return 'Phone number must contain 10 - 13 digits'
    }

    return true
}

export const nameValidation = (v: any): boolean | string => {
    const pattern = /^[A-Za-z\s'.,]+$/;

    if (pattern.test(v)) {
        return true
    } else {
        return 'Please use alphabetical characters'
    }
}

export const fileSize = (v: any): boolean | string => {
  const limit = 100 * 1024 * 1024

  if (v[0].size <= limit ) {
      return true
  } else {
      return 'File size must be under 100mb'
  }
}

export const isPasswordValid = (v: any) : boolean | string => {
    const hasNumber = /[0-9]/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasNoSpace = /^\S*$/; // No space allowed
    const isMinimumLength = v.length >= 8;

    // Check if password meets all the criteria
    if(!hasNumber.test(v)) {
        return  'Password must contain a number character'
    }

    if(!hasUppercase.test(v)) {
        return 'Password must contain an uppercase character'
    }

    if(!hasLowercase.test(v)) {
        return 'Password must contain a lowercase character'
    }

    if(!hasSpecialChar.test(v)) {
        return 'Password must contain a special character'
    }

    if(!hasNoSpace.test(v)) {
        return 'Password must not contain spaces'
    }

    if(!isMinimumLength) {
        'Password must be minimum 8 characters'
    }

    return true
}

export const emailValidation = (v: any): boolean | string => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(v)) {
        return 'Wrong email format'
    } else {
        return true
    } 
}

export const isNumberOnly = (v: any): boolean | string => {
    const mustBeNumber = /^[0-9]*$/;
    
    if(!mustBeNumber.test(v)) {
        return 'Please use numerical characters'
    }

    return true
}
