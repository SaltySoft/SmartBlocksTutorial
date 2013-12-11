<?php
/**
 * Date: 12/03/2013
 * Time: 11:28
 * This is the model class called Task
 */
namespace TodoBlock;
/**
 * @Entity @Table(name="todoblock_tasks")
 */
class Task extends \Model
{
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @Column(type="string")
     */
    private $name;

    /**
     * @Column(type="boolean")
     */
    private $done;

    /**
     * @ManyToOne(targetEntity="\User")
     */
    private $creator;

    public function __construct() {
        $this->creator = \User::current_user();
        $this->name = "";
        $this->done = false;
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
     * @param boolean $done
     */
    public function setDone($done) {
        $this->done = $done;
    }

    /**
     * @return boolean
     */
    public function getDone() {
        return $this->done;
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
     * @return array
     */
    public function toArray() {
        $array = array(
            "id" => $this->id,
            "name" => $this->name,
            "done" => $this->done,
            "creator" => $this->creator->toArray()
        );
        return $array;
    }
    
}