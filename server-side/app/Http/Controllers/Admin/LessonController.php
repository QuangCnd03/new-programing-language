<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Course\CourseRepositoryInterface;
use App\Repositories\Document\DocumentRepositoryInterface;
use App\Repositories\Lesson\LessonRepositoryInterface;
use App\Repositories\Video\VideoRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{
    protected $lessonRepo;
    protected $courseRepo;
    protected $videoRepo;
    protected $documentRepo;
    public function __construct(
        LessonRepositoryInterface $lessonRepositoryInterface,
        CourseRepositoryInterface $courseRepositoryInterface,
        VideoRepositoryInterface $videoRepositoryInterface,
        DocumentRepositoryInterface $documentRepositoryInterface
    ) {
        $this->lessonRepo = $lessonRepositoryInterface;
        $this->courseRepo = $courseRepositoryInterface;
        $this->videoRepo = $videoRepositoryInterface;
        $this->documentRepo = $documentRepositoryInterface;
    }
    private function findCourse($courseId) {
        $course = $this->courseRepo->find($courseId);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        return $course;
    }
    public function index($courseId) {
        $course = $this->findCourse($courseId);
        $lessons = $this->lessonRepo->getAll();
        return response()->json([
            'message' => 'Fetching lessons successfully', 
            'lessons' => $lessons,
            'courseName' => $course->name
        ]);
    }
    public function store(Request $request, $courseId)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'course_id' => 'required',
            'parent_id' => 'nullable',
            'is_trial' => 'in:0,1',
            'status' => 'in:0,1',
            'video' => 'nullable|file', 
            'document' => 'nullable|file',
            'description' => 'nullable|string',
        ]);
        $course = $this->findCourse($courseId);
        $validatedData['position'] = $this->lessonRepo->getPosition($courseId);

        if ($request->hasFile('video')) {
            $videoFile = $request->file('video');
            $videoPath = $videoFile->store('public/videos');
            $videoUrl = Storage::url($videoPath);
            $videoName = $videoFile->getClientOriginalName();
            $videoSize = $videoFile->getSize();
            $newVideo = $this->videoRepo->createVideo(['name' => $videoName, 'url' => $videoUrl, 'size' => $videoSize]);
            $validatedData['video_id'] = $newVideo ? $newVideo->id : null;
        }
    
        if ($request->hasFile('document')) {
            $documentFile = $request->file('document');
            $documentPath = $documentFile->store('public/documents');
            $documentUrl = Storage::url($documentPath);
            $documentName = $documentFile->getClientOriginalName();
            $documentSize = $documentFile->getSize();
            $newDocument = $this->documentRepo->createDocument(['name' => $documentName, 'url' => $documentUrl, 'size' => $documentSize]);
            $validatedData['document_id'] = $newDocument ? $newDocument->id : null;
        }
    
        $this->lessonRepo->create([
            'name' => $validatedData['name'],
            'slug' => $validatedData['slug'],
            'course_id' => $validatedData['course_id'],
            'video_id' => $validatedData['video_id'],
            'document_id' => $validatedData['document_id'],
            'parent_id' => $validatedData['parent_id'] ?? null,
            'is_trial' => $validatedData['is_trial'],
            'views' => $validatedData['views'] ?? 0,
            'position' => $validatedData['position'],
            'durations' => $validatedData['durations'] ?? 0,
            'description' => $validatedData['description'],
            'status' => $validatedData['status'],
        ]);
    
        return response()->json([
            'message' => 'Lesson created successfully',
            'lesson' => $validatedData
        ], 200);
    }
    public function storeModule(Request $request, $courseId) {
        $course = $this->findCourse($courseId);
        $this->lessonRepo->create([
            'name' => $request->name,
            'slug' => $request->slug,
            'course_id' => $courseId,
            'parent_id' => null,
            'views' => 0,
            'durations' => 0,
            'status' => 1
        ]);
        $lessons = $this->lessonRepo->getLessons($courseId);
        return response()->json(['message' => 'Fetching lessons successfully', 'lessons' => $lessons]);
    }
    public function destroy($lessonId) {
        $lesson = $this->lessonRepo->find($lessonId);
        if(!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }
        $this->lessonRepo->delete($lessonId);
        return response()->json(['message' => 'Delete successfully']);
    }
}
