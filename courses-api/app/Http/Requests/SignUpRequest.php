<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fullname' => 'required|string|max:255',
            'phone' => 'required|string|regex:/^[0-9]{10,11}$/',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'confirm_password' => 'required|string|same:password'
        ];
    }
    public function messages() {
        return [
        'fullname.required' => 'Please enter your full name.',
        'fullname.max' => 'Your full name must not be over 255 characters.',

        'phone.required' => 'Please enter your phone number.',
        'phone.regex' => 'Your phone number must be 10 or 11 digits.',

        'email.required' => 'Please enter your email.',
        'email.email' => 'The email is not in the correct format.',
        'email.max' => 'The email must not be over 255 characters.',
        'email.unique' => 'This email is already in use.',

        'password.required' => 'Please enter your password.',
        'password.min' => 'Password must be at least 6 characters.',

        'confirm_password.required' => 'Please confirm password.',
        'confirm_password.same' => 'Confirm password does not match password.',
        ];
    }
}
