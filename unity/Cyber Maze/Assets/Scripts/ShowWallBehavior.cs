using UnityEngine;
using System.Collections;

public class ShowWallBehavior : MonoBehaviour
{

    public bool IsActivated;
    private bool _isVisible;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	    if (IsActivated && !_isVisible)
	    {
            iTween.MoveBy(gameObject, iTween.Hash("y", 5, "easeType", "easeInOutExpo", "loopType", "none", "delay", .1));
	        _isVisible = true;
	    }

	    if (!IsActivated && _isVisible)
	    {
            iTween.MoveBy(gameObject, iTween.Hash("y", -5, "easeType", "easeInOutExpo", "loopType", "none", "delay", .1));
            _isVisible = false;
        }
	}
}
