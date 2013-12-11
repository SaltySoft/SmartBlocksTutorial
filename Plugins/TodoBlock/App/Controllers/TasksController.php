<?php
/**
 *
 */
 
namespace TodoBlock;

use TodoBlock\Business\TaskBusiness;

class TasksController extends \Controller {

    public function index() {
        $qb = \Model::getEntityManager()->createQueryBuilder();

        $qb->select('t')->from('\TodoBlock\Task', 't')->where('t.creator = :user')->setParameter('user', \User::current_user());

        $result = $qb->getQuery()->getResult();

        $response = array();
        foreach ($result as $r) {
            $response[] = $r->toArray();
        }

        if (\User::current_user() != null) {
            $this->return_json($response);
        } else {
            $this->json_error('You need to be connected', 403);
        }
    }
    
    public function show($params = array()) {
        $result = \Task::find($params['id']);
        if (is_object($result) && $result->getCreator() == \User::current_user()) {
            $this->return_json($result->toArray());
        } else {
            $this->json_error('This task does not exist', 404);
        }
    }
    
    public function create($params = array()) {
        $data = $this->getRequestData();
        $task = TaskBusiness::createOrUpdate($data);
        if (is_object($task)) {
            $this->return_json($task->toArray());
        } else {
            $this->json_error('There was a problem', 500);
        }
    }
    
    public function update($params = array()) {
        $data = $this->getRequestData();
        $data['id'] = $params['id'];
        $task = TaskBusiness::createOrUpdate($data);
        if (is_object($task)) {
            $this->return_json($task->toArray());
        } else {
            $this->json_error('This task does not exist', 404);
        }
    }
    
    public function destroy($params = array()) {
        $task = \TodoBlock\Task::find($params['id']);
        if (is_object($task) && $task->getCreator() == \User::current_user()) {
            $task->delete();
            $this->json_message('Task successfully deleted');
        } else {
            $this->json_error('There was a problem', 500);
        }
    }
}