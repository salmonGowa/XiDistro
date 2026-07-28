<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRetailerRequest;
use App\Http\Requests\UpdateRetailerRequest;
use App\Http\Resources\RetailerResource;
use App\Models\Retailer;
use Illuminate\Http\Response;

class RetailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RetailerResource::collection(Retailer::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRetailerRequest $request)
    {
        $retailer = Retailer::create($request->validated());

        return (new RetailerResource($retailer))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Retailer $retailer)
    {
        return new RetailerResource($retailer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRetailerRequest $request, Retailer $retailer)
    {
        $retailer->update($request->validated());

        return new RetailerResource($retailer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Retailer $retailer)
    {
        $retailer->delete();

        return response()->noContent();
    }
}
