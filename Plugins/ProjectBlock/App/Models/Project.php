<?php
/**
 * Date: 12/03/2013
 * Time: 11:28
 * This is the model class called Project
 */
namespace ProjectBlock;
/**
 * @Entity @Table(name="project_block_project")
 */
class Project extends \Model {
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @Column(type="string")
     */
    private $name;

    /**
     * @Column(type="text")
     */
    private $description;

    /**
     * @ManyToOne(targetEntity="\User")
     */
    private $creator;

    /**
     * @ManyToMany(targetEntity="\TodoBlock\Task")
     */
    private $tasks;

    public function __construct() {
        $this->name = "";
        $this->description = "";
        $this->creator = \User::current_user();
        $this->tasks = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param \User $creator
     */
    public function setCreator($creator) {
        $this->creator = $creator;
    }

    /**
     * @return \User
     */
    public function getCreator() {
        return $this->creator;
    }

    /**
     * @param string $description
     */
    public function setDescription($description) {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @param string $name
     */
    public function setName($name) {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @param \TodoBlock\Task[] $tasks
     */
    public function setTasks($tasks) {
        $this->tasks = $tasks;
    }

    /**
     * @return \TodoBlock\Task
     */
    public function getTasks() {
        return $this->tasks;
    }



    /**
     * @return Project[]
     */
    public function toArray() {

        $tasks = array();

        foreach ($this->tasks as $t) {
            $tasks[] = $t->toArray();
        }

        $array = array(
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "creator" => $this->creator->toArray(),
            "tasks" => $tasks
        );

        return $array;
    }
}