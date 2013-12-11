<?php
/**
 *
 */
 
namespace TodoBlock\Business;

class TaskBusiness {

    
    public static function findAll() {
    
    }
    
    public static function find($id) {
    
    }
    
    public static function destroy($id) {
    
    }
    
    public static function createOrUpdate($data) {
        $task = null;
        if (isset($data['id'])) {
            $task = \TodoBlock\Task::find($data['id']);
        }

        if (!is_object($task)) {
            $task = new \TodoBlock\Task();
        }

        $task->setDone($data['done']);
        $task->setName($data['name']);

        if ($task->getCreator() == \User::current_user()) {
            $task->save();
            return $task;
        } else {
            return null;
        }

    }
}