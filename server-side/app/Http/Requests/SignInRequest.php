<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignInRequest extends FormRequest
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
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6'
        ];
    }
    public function messages() {
        return [
            'email.required' => 'Email cannot be blank',
            'email.email' => 'Email format is incorrect',
            'email.max' => 'Email must not be over 255 characters',
            'password.required' => 'Password cannot be blank',
            'password.min' => 'Password must be at least 6 characters'
        ];
    }
}
