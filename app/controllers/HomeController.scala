package controllers

import akka.actor._
import de.htwg.se.skyjo.Skyjo
import akka.actor.ActorSystem
import akka.stream.Materializer
import de.htwg.se.skyjo.controller.{BoardChanged, CandidatesChanged, GameOver, NewRound, Shutdown}

import javax.inject._
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import scala.swing.Reactor

@Singleton
class HomeController @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {

  val gameController = Skyjo.controller

  def offline() = Action {
    implicit request: Request[AnyContent] =>
      Ok(views.html.offline())
  }

  def about() = Action {
    Ok(views.html.index())
  }

  def skyjo = Action {
    Ok(views.html.game(gameController))
  }

  def newGame = Action {
    gameController.newGame()
    Ok(views.html.game(gameController))
  }

  def addPlayer(player: String) = Action {
    gameController.createPlayer(player)
    Ok(views.html.game(gameController))
  }

  def uncover(posX: Int, posY: Int, player: Int) = Action {
    gameController.doMove(posX, posY, player)
    Ok(views.html.game(gameController))
  }

  def getCard(posY: Int, posX: Int, player: Int) = Action {
    gameController.getCard(posY, posX, player)
    Ok(views.html.game(gameController))
  }

  def drawCard() = Action {
    gameController.drawCard
    Ok(views.html.game(gameController))
  }

  def tradeCard() = Action {
    gameController.trade = true
    Ok(views.html.game(gameController))
  }

  def undo() = Action {
    gameController.undo
    Ok(views.html.game(gameController))
  }

  def redo() = Action {
    gameController.redo
    Ok(views.html.game(gameController))
  }

  def load = Action {
    Ok(gameController.gameBoardtoJson)
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect Received")
      SkyjoWebSocketActorFactory.create(out)
    }
  }

  object SkyjoWebSocketActorFactory {
    def create(out: ActorRef) =  {
      Props(new SkyjoWebSocketActor(out))
    }
  }

  class SkyjoWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)

    def receive = {
      case msg: String =>
        out ! (gameController.gameBoardtoJson.toString)
        println("Sent Json to Client" + msg)
    }

    reactions += {
      case event: BoardChanged => sendJsonToClient
      case event: CandidatesChanged => sendJsonToClient
      case event: NewRound => sendJsonToClient
      case event: GameOver => sendJsonToClient
      case event: Shutdown => sendJsonToClient
    }

    def sendJsonToClient = {
      println("Received event from Controller")
      out ! (gameController.gameBoardtoJson.toString)
    }
  }



}
