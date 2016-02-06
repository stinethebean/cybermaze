using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Assets.Scripts
{
    public interface IAvatarController
    {
        void MoveToTile(Transform targeTransform);
        int TileX { get; set; }
        int TileY { get; set; }
    }
}
