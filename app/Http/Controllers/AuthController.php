<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): UserResource
    {
        $user = DB::transaction(function () use ($request): User {
            $tenant = Tenant::create([
                'name' => $request->string('business_name'),
                'phone' => $request->string('business_phone'),
            ]);

            return User::create([
                'tenant_id' => $tenant->id,
                'name' => $request->string('name'),
                'email' => $request->string('email'),
                'phone' => $request->string('phone'),
                'role' => UserRole::Owner,
                'password' => $request->string('password'),
            ]);
        });

        Auth::login($user);
        $request->session()->regenerate();

        return new UserResource($user->load('tenant'));
    }

    public function login(LoginRequest $request): UserResource
    {
        if (! Auth::attempt($request->only('email', 'password'), remember: true)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        return new UserResource(Auth::user()->load('tenant'));
    }

    public function logout(Request $request): \Illuminate\Http\Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user()->load('tenant'));
    }
}
