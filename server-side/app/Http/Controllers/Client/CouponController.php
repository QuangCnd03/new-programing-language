<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Coupon\CouponRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    protected $couponRepo;
    public function __construct(CouponRepositoryInterface $couponRepo) {
        $this->couponRepo = $couponRepo;
    }
    public function show($couponCode) {
        try {
            $coupon = $this->couponRepo->getCoupon($couponCode);
            if(!$coupon) {
                throw new \Exception('Coupon code does not exist', 400);
            }
            $today = Carbon::now()->format('Y-m-d H:i:s');
            $startDate = $coupon->start_date;
            $endDate = $coupon->end_date;
            if((!$startDate && !$endDate) || ($today > $startDate && $today < $endDate)) {
               return response()->json([
                'success' => true,
                'message' => 'Verify coupon successfully',
                'discount_value' => $coupon->discount_value,
                'discount_type' => $coupon->discount_type,
                'coupon_code' => $coupon->code
               ], 200);
            }
            throw new \Exception('Coupon code has expired', 400);
        } catch (\Exception $exception) {
            $status = $exception->getCode();
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], $status ?? 500);
        }
    }
}
